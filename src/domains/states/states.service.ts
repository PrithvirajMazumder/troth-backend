import { Injectable } from '@nestjs/common'

@Injectable()
export class StatesService {
  public getIndianSates = () => {
    return [
      { displayName: 'Andhra Pradesh', value: 'AP' },
      { displayName: 'Arunachal Pradesh', value: 'AR' },
      { displayName: 'Assam', value: 'AS' },
      { displayName: 'Bihar', value: 'BR' },
      { displayName: 'Chhattisgarh', value: 'CT' },
      { displayName: 'Goa', value: 'GA' },
      { displayName: 'Gujarat', value: 'GJ' },
      { displayName: 'Haryana', value: 'HR' },
      { displayName: 'Himachal Pradesh', value: 'HP' },
      { displayName: 'Jharkhand', value: 'JH' },
      { displayName: 'Karnataka', value: 'KA' },
      { displayName: 'Kerala', value: 'KL' },
      { displayName: 'Madhya Pradesh', value: 'MP' },
      { displayName: 'Maharashtra', value: 'MH' },
      { displayName: 'Manipur', value: 'MN' },
      { displayName: 'Meghalaya', value: 'ML' },
      { displayName: 'Mizoram', value: 'MZ' },
      { displayName: 'Nagaland', value: 'NL' },
      { displayName: 'Odisha', value: 'OD' },
      { displayName: 'Punjab', value: 'PB' },
      { displayName: 'Rajasthan', value: 'RJ' },
      { displayName: 'Sikkim', value: 'SK' },
      { displayName: 'Tamil Nadu', value: 'TN' },
      { displayName: 'Telangana', value: 'TS' },
      { displayName: 'Tripura', value: 'TR' },
      { displayName: 'Uttar Pradesh', value: 'UP' },
      { displayName: 'Uttarakhand', value: 'UK' },
      { displayName: 'West Bengal', value: 'WB' },
      { displayName: 'Andaman and Nicobar Islands', value: 'AN' },
      { displayName: 'Chandigarh', value: 'CH' },
      { displayName: 'Dadra and Nagar Haveli and Daman and Diu', value: 'DN' },
      { displayName: 'Lakshadweep', value: 'LD' },
      { displayName: 'Delhi', value: 'DL' },
      { displayName: 'Puducherry', value: 'PY' },
      { displayName: 'Ladakh', value: 'LA' },
      { displayName: 'Jammu and Kashmir', value: 'JK' }
    ]
  }
}
