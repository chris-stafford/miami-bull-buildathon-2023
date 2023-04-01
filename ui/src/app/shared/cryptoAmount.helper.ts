import { Injectable } from '@angular/core';
import { Decimal } from 'decimal.js';
@Injectable()
export class CryptoAmountHelper {
  //sides
  public BUY_SIDE = "BUY";
  public SELL_SIDE = "SELL"
  //Currencies
  public USD = "USD"; 
  public BTC = "BTC";    
  public LTC = "LTC";   
  public BCH = "BCH";  
  public XRP = "XRP";   
  public ETH = "ETH";
  public DELTIX_CARMA = "DELTIX_CARMA";
  public CARMA_P3 = "CARMA_P3";
  getCurrencyNumberOfDecimals(currencyCode: string){
    switch (currencyCode.toUpperCase()) {
      case "BTC":   
      case "TBTC":  
      case "LTC":       
      case "TLTC": 
      case "BCH":   
      case "TBCH":  
        return 8;   
      case "XRP":       
      case "TXRP":       
        return 6;  
      case "ETH": 
      case "TETH": 
      case "USDC":
      case "TUSDC":
      case "PAX":
      case "TPAX":
      case "TUSD":
      case "TTUSD":
        return 18; 
      case this.USD:
        return 2; 
      default:
        return 0;
    }
  }

  getCryptoDecimalString(amount: string, currencyCode: string): string{
    
    if (amount == null || amount == '')
      return amount;

    amount = this.formatStringNumberWithoutThousandSeparator(amount);
    if (new Decimal(amount).equals(0))
      return '0';

    let decimalDelimiter = this.getLocalDecimalDelimiter();

    let currencyNumberOfDecimals = this.getCurrencyNumberOfDecimals(currencyCode);

    let point = amount.toString().indexOf(decimalDelimiter, 0);

    if (point == -1)
      return this.formatStringNumberWithThousandSeparator(amount + decimalDelimiter + "".padEnd(currencyNumberOfDecimals, "0"));
      
    let numericPart = amount.split(decimalDelimiter)[0];
    let decimalPart = amount.split(decimalDelimiter)[1];

    decimalPart = decimalPart.padEnd(currencyNumberOfDecimals, "0");

    let finalNumber = numericPart + decimalDelimiter + decimalPart.substring(0, currencyNumberOfDecimals);

    return this.formatStringNumberWithThousandSeparator(finalNumber);
  }

  getLocalDecimalDelimiter() {
      var n = 1.1;
      let decimalDelimiter = n.toLocaleString().substring(1, 2);
      return decimalDelimiter;
  }

  formatStringNumberWithThousandSeparator(value: string): string {
    let decimalDelimiter = this.getLocalDecimalDelimiter();
    let thousandDelimiter = decimalDelimiter === '.' ? ',' : '.';
    var parts = value.toString().split(decimalDelimiter);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandDelimiter);
    let result = parts.join(decimalDelimiter);
    return result;
  }

  formatStringNumberWithoutThousandSeparator(value: string): string {
    let decimalDelimiter = this.getLocalDecimalDelimiter();
    let thousandDelimiter = decimalDelimiter === '.' ? ',' : '.';
    return value.split(thousandDelimiter).join('');
  }

  getWalletNameFromType(walletType: string){
    let walletTypeValue = walletType.trim().toUpperCase();
    switch (walletTypeValue) {
      case "CLIENT":
          return "CUSTOMER";    
      default:
        return walletTypeValue;
    }
  }

  sumByDecimal<T>(collection: T[] | null | undefined, iteratee?: ((value: T) => string)): Decimal
  {
    let result = new Decimal(0);    
    collection.map(x => {result = result.add( new Decimal(iteratee(x)));});
    return result;
  }

  isNegative(value: string): boolean {
    if (value === undefined || value === null || !value || value.toString().trim() === '')
      return false;

    return (value && value.toString().length > 0 && value.toString().charAt(0) === '-');
  }

  getNegativeNumberCssClass(value: string): string {
    if (value === undefined || value === null || !value || value.toString().trim() === '')
      return '';

    return this.isNegative(value) ? 'text-danger' : '';
  }
  getPositiveNegativeNumberCssClass(value: string): string {
    if (value === undefined || value === null || !value || value.toString().trim() === '')
      return '';

    return this.isNegative(value) ? 'text-danger' : 'text-success';
  }

  isNumber(value: string): boolean {
    try {
      Number(value);
    } catch {
      return false;
    }
    return true;
  }

  isDecimal(value: string): boolean {
    try {
      new Decimal(value);
    } catch {
      return false;
    }
    return true;
  }
}