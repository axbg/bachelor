import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CheckoutForm from '../checkoutForm';
import { toastr } from 'react-redux-toastr';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Credits extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      addOptionId: 0,
      addCredits: 1,
    };

    this.openModal = this.openModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if (this.props.options.notSelectedOptions.length !== 0) {
      this.setState({
        addOptionId: this.props.options.notSelectedOptions[0].id,
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  openModal() {
    this.setState({ modal: true });
  }

  handleClose() {
    this.setState({ modal: false });
  }

  addOption(e) {
    if (this.props.student.credits !== 0) {
      if (this.props.role !== 'STUDENT') {
        this.props.addOption({ studentId: this.props.student.id, optionId: this.state.addOptionId });
      } else {
        this.props.addOption(this.state.addOptionId);
      }
    } else {
      toastr.warning('Nu ai suficiente credite disponibile');
    }
  }

  deleteOption(e) {
    if (this.props.role !== 'STUDENT') {
      this.props.deleteOption({ studentId: this.props.student.id, optionId: e.target.parentNode.value });
    } else {
      this.props.deleteOption(e.target.parentNode.value);
    }
  }

  render() {
    return (
      <div>
        <Dialog open={this.state.modal} onClose={this.handleClose} TransitionComponent={Transition}
          keepMounted aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle id="alert-dialog-slide-title">Efectuează plata</DialogTitle>
          <DialogContent>
            <CheckoutForm numberOfCredits={this.state.addCredits} email={this.props.student.email}
              id={this.props.student.id} buyCredits={this.props.buyCredits} />
          </DialogContent>
        </Dialog>
        {!this.props.student.enrolled ?
          <div className="student-credits-container">
            {
              this.props.role === 'STUDENT' ?
                <div>
                  <h4>Momentan ai {this.props.student.credits} credite.</h4>
                  <h4>Folosind creditele poți insera opțiuni în lista de preferințe</h4>
                  <h4>Creditele pot fi achiziționate online sau cu ajutorul unui casier, în ziua înscrierii.</h4>
                  <br />
                  <div className="select">
                    <select className="select-text" onChange={(e) => this.onChange(e)} required value={this.state.addCredits} name="addCredits">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                    <span className="select-highlight"></span>
                    <span className="select-bar"></span>
                    <label className="select-label">Număr credite</label>
                  </div>
                  <Button variant="contained" color="primary" onClick={() => this.openModal()}>Cumpără credite</Button>
                </div> :
                <h4>Studentul are {this.props.student.credits} credite.</h4>
            }
          </div> :
          ''
        }
        {
          this.props.role === 'STUDENT' ?
            <div>
              <h4>Opțiunile tale</h4>
              <h5>Opțiunile trebuie înregistrate crescător în ordinea preferințelor</h5>
            </div> : ''
        }
        <div className="student-credits-table-container">
          <Paper style={{ overflow: 'auto', maxHeight: '250px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="no-padding-table-cell sticky">#</TableCell>
                  <TableCell className="sticky">Facultate</TableCell>
                  {!this.props.student.enrolled || this.props.role === 'ADMIN' ? <TableCell className="no-padding-table-cell sticky proeminent"></TableCell> : <td></td>}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.options.selectedOptions.map((option, key) => {
                  return (
                    <TableRow key={key}>
                      <TableCell className="no-padding-table-cell">{key + 1}</TableCell>
                      <TableCell>{option['faculty_profile.name']} - {option['faculty_profile.type'] === 'B' ? 'BUGET' : 'TAXA'}</TableCell>
                      {!this.props.student.orderNumber || (!this.props.student.enrolled && this.props.role === 'OPERATOR') || this.props.role === 'ADMIN' ?
                        <TableCell className="no-padding-table-cell">
                          <Button value={option.id} onClick={(e) => this.deleteOption(e)}>Șterge</Button></TableCell> : <td></td>
                      }
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
        <br />
        <br />
        {
          !this.props.student.enrolled ?
            <div className="options-select">
              <div className="select">
                <select className="select-text" onChange={(e) => this.onChange(e)} value={this.state.addOptionId} name="addOptionId">
                  {
                    this.props.options.notSelectedOptions.length !== 0 ?
                      this.props.options.notSelectedOptions.map((option, key) => <option key={key} value={option.id}>
                        {option.name} - {option.type === 'B' ? 'BUGET' : 'TAXĂ'}
                      </option>) :
                      <option>Nicio opțiune disponibilă</option>
                  }
                </select>
                <span className="select-highlight"></span>
                <span className="select-bar"></span>
                <label className="select-label">Opțiuni</label>
              </div>
              <br />
              <Button variant="contained" color="primary" onClick={() => this.addOption()}>Adaugă Opțiune</Button>
            </div> :
            ''
        }
      </div>
    );
  }
}

export default Credits;
