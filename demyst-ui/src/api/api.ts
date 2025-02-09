import { API_URL } from "../constants/url.ts";

export async function getBalanceSheet(){
  try{
    const response = await fetch(`${API_URL}/api/v1/balance-sheet`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return await response.json()

  } catch(error){
    throw error
  }
}