public with sharing class DataController {
         @AuraEnabled(cacheable=true)
    public static List<Data__c> getDataRecord(){
        return[SELECT creditorName__c, firstName__c, lastName__c, minPaymentPercentage__c, balance__c FROM Data__c];
            }

            @AuraEnabled(cacheable=true)
            public static Integer totalCount(){ 
                try {
                  return [SELECT Id from Data__c].size();
                } catch (Exception e) {
                    throw new AuraHandledException(e.getMessage());
                }
            }


            @AuraEnabled  
            public static void deleteSelectedData(List<Data__c> delData){  
              delete delData;  
            }

            @AuraEnabled(cacheable=true)
            public static Double totalBalance(String selectBalance){
              try {
               List<Data__c> selectBal = (List<Data__c>)JSON.deserialize(selectBalance, List<Data__c>.class);
                Double sum = 0;
                for(Data__c d: selectBal){
                  sum = sum + d.balance__c;
                }
                System.debug(sum);
                return sum;
              } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
              }
            } 
            @AuraEnabled(cacheable=false)
            public static void addData(List<Data__c>
            anceRecord){
                try {
                 List<Data__c> dataClone = new List<Data__c>();
                 for (Data__c d : dataRecord) {
                  dataClone.add(d.clone(false,true,false,false));
                 }
                 System.debug(dataClone); 
                   insert dataClone;
                  } catch (Exception e) {
                    throw new AuraHandledException(e.getMessage());
                }
            }

    }

