const archiver = require('archiver');

const generateError = require('../utils/FlowError').generateError;

const adminService = require('../services/admin');
const httpHelper = require('../utils/httpHelper');
const Document = require('../models').Document;

module.exports.drySort = async (ctx) => {
  await adminService.checkSortDetails(ctx.request.body.email, ctx.request.body.iteration);
  adminService.sort(true, ctx.state.user.id, ctx.headers.authorization, ctx.request.body.email,
      ctx.request.body.iteration);
  httpHelper.createHttpResponse(ctx, 200, 'Dry sort process started');
};

module.exports.sort = async (ctx) => {
  await adminService.checkSortDetails(ctx.request.body.email, ctx.request.body.iteration);
  adminService.sort(false, ctx.state.user.id, ctx.headers.authorization, ctx.request.body.email,
      ctx.request.body.iteration);
  httpHelper.createHttpResponse(ctx, 200, 'Sort process started');
};

module.exports.getIterations = async (ctx) => {
  httpHelper.createHttpResponse(ctx, 200, { iterations: await adminService.getIterations() });
};

module.exports.downloadDocuments = async (ctx) => {
  ctx.params.iteration || generateError('Iteration name is not present', 400);
  const documents = await Document.findAll(
      {
        where: { iteration: ctx.params.iteration },
        attributes: ['title', 'file'], raw: true,
      });

  const archive = archiver('zip');

  archive.on('warning', function(err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  });

  archive.on('error', function(err) {
    throw err;
  });

  documents.map((document) => {
    archive.append(Buffer.from(document.file, 'base64'), { name: document.title });
  });

  archive.finalize();

  ctx.status = 200;
  ctx.type = 'application/zip';
  ctx.response.attachment(ctx.params.iteration + '.zip');
  ctx.body = archive;
};
