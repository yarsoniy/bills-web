import {Group, GroupPreview} from "@/app/api/types/group";
import {Bill, BillPreview, MoneyBreakdown, ParticipantDeposits, ParticipantSummary} from "@/app/api/types/bill";
import {BillItem, SplitAgreement} from "@/app/api/types/billItem";

export const api = {
  getAllGroups: async (): Promise<GroupPreview[]> => {
    const response = await fetch('/be/api/v1/participant_group');
    const data = await response.json();
    return data.data;
  },
  getGroup: async (groupId: string): Promise<Group> => {
    const response = await fetch('/be/api/v1/participant_group/' + groupId);
    const data = await response.json();
    return data.data;
  },
  createGroup: async (title: string) => {
    const response = await fetch('/be/api/v1/participant_group/', {
      method: 'POST',
      body: JSON.stringify({title: title})
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
  },
  createParticipant: async (groupId: string, name: string) => {
    const response = await fetch('/be/api/v1/participant_group/' + groupId + '/participant', {
      method: 'POST',
      body: JSON.stringify({name: name})
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
  },
  createBill: async (groupId: string, title: string) => {
    const response = await fetch('/be/api/v1/participant_group/' + groupId + '/bill', {
      method: 'POST',
      body: JSON.stringify({title: title})
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
  },
  getBills: async (groupId: string): Promise<BillPreview[]> => {
    const response = await fetch('/be/api/v1/participant_group/' + groupId + '/bill');
    const data = await response.json();
    return data.data;
  },
  getBill: async (billId: string): Promise<Bill> => {
    const response = await fetch('/be/api/v1/bill/' + billId);
    const data = await response.json();
    return data.data;
  },
  createBillItem: async (billId: string, title: string, cost: number) => {
    const response = await fetch('/be/api/v1/bill/' + billId + '/item', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        cost: cost
      })
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
  },
  getBillParticipantSummary: async (billId: string): Promise<ParticipantSummary> => {
    const response = await fetch('/be/api/v1/bill/' + billId + '/participant_summary');
    const data = await response.json();
    return data.data;
  },
  putBillParticipantDeposits: async (billId: string, deposits: {values: MoneyBreakdown}) => {
    const response = await fetch('/be/api/v1/bill/' + billId + '/deposits', {
      method: 'PUT',
      body: JSON.stringify(deposits)
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
  },
  getBillItem: async (billId: string, itemId: string): Promise<BillItem> => {
    const response = await fetch(`/be/api/v1/bill/${billId}/item/${itemId}`);
    const data = await response.json();
    return data.data;
  },
  putBillItem: async (billId: string, billItemId: string, title: string, cost: number, agreement: SplitAgreement) => {
    const response = await fetch('/be/api/v1/bill/' + billId + '/item/' + billItemId, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        cost: cost,
        agreement: agreement
      })
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
  },
}
