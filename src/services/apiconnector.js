 import axios from "axios";
 

export const apiConnector = (method, url, bodyData, header, params) => {
    return axios({
      method,
      url,
      data: bodyData || null,
      headers: header || {},
      params: params || null,
    });
  };
  