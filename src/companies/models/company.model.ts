export interface Company {
  uid: string;
  name: string;
  legal_name: string;
  address_line_1: string;
  address_line_2?: string;
  zip_code: number;
  state: string;
  gstin: string;
  city: string;
  total_gross_invoice_amount: number;
  total_net_invoice_amount: number;
  total_gross_challan_amount: number;
  total_net_challan_amount: number;
  user_id: string;
  bank_id: string;
}
