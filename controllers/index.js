module.exports.getDocuments = async (ctx) => {
    console.log("getting documents");
    ctx.body = { message: "flow - student module - student get documents" };
}

module.exports.getDocument = async (ctx) => {
    console.log("getting documents");
    ctx.body = { message: "flow - student module - student get detailed document" };
}