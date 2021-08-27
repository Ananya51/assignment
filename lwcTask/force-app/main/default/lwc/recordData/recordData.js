import { LightningElement , wire, track} from 'lwc';
import {refreshApex} from '@salesforce/apex';
import getMethod from '@salesforce/apex/DataController.getDataRecord';
import deleteSelectedData from '@salesforce/apex/DataController.deleteSelectedData';
import totalBalance from '@salesforce/apex/DataController.totalBalance';
import totalCount from '@salesforce/apex/DataController.totalCount';


const columns = [
    {label: 'Creditor', fieldName:'creditorName__c', type:'text'},
    {label: 'First Name', fieldName:'firstName__c', type: 'text'},
    {label: 'Last Name', fieldName:'lastName__c', type: 'text'},
    {label: 'Min Pay%', fieldName:'minPaymentPercentage__c', type:'percent'},
    {label: 'Balance', fieldName:'balance__c', type:'currency'}
];



          export default class RecordData extends LightningElement {
             col = columns;
             balance;
             @wire(totalCount) count;
              @wire(getMethod) delData;
              @track bShowModal = false;

              openModal() {
                this.bShowModal = true;
            }
            closeModal() {
                this.bShowModal = false;
            }
            refreshPage(){
            window.location.reload();
            }

            deleteRecord(){
                var selectedRecords =
                 this.template.querySelector("lightning-datatable").getSelectedRows();
                 deleteSelectedData({delData: selectedRecords})
                .then(result=>{
                  return refreshApex(this.delData);
                })
                .catch(error=>{
                  alert('Could not delete'+JSON.stringify(error));
                })
              }
              total(){
                var list = this.template.querySelector("lightning-datatable").getSelectedRows();
                totalBalance({selectBalance : JSON.stringify(list)})
                .then(show=>{
                  this.balance = show;
                  return refreshApex(this.delData);
                }).catch(error=>{
                       })
              }

                getSelectedRow() {
                  var selectRows = this.template.querySelector("lightning-datatable").getSelectedRows();
                  this.checkedRow = selectRows.length;
                  alert('Number of Checked Rows are:'+this.checkedRow);
                }

              }





