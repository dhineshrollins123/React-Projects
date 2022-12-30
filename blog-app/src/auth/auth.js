export const isLoggedIn = () => {
   console.log("0");
   if(localStorage.getItem("data") !== null){
      console.log("1");
      return true;
   }else {
      console.log("2");
      return false;
   }
};

export const doLogin = (data,next) => {
   localStorage.setItem("data", JSON.stringify(data));
   next();
};

export const doLogOut = (next) => {
   localStorage.removeItem("data");
   localStorage.clear();
   next();
};

export const currentLoggedInUser = () => {
   if(isLoggedIn()){
      return JSON.parse(localStorage.getItem("data"))?.user;
   }else{
      return undefined;
   }
};

export const getToken = () => {
   console.log("token avail ");

   if(isLoggedIn()){
      console.log("token available 1 ");
      return JSON.parse(localStorage.getItem("data"))?.token;
   }else{
      return undefined;
   }
};