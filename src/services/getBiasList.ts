import mainApi from "./apis/mainApi";

async function getBiasList() {
  return await mainApi.get("/home/my_bias").then((res) => {
    return res.data;
  });
}

export default getBiasList;
