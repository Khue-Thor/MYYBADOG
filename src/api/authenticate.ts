  //get user from supabase to see if wallet address already exists
  export const getUser = async (address: any) => {
    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
    try {
      const res = await fetch(`/api/user/find?address=${address}`, options);
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      const jsonRes = await res.json();
      return jsonRes;
    } catch (err) {
      console.log(err);
    }
  };

  export const createUser = async (address: string) => {
    try {
      const options: RequestInit = {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify({ address: address.toString() }),
      };
      const res = await fetch("/api/user/create", options);
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(
          ("Something went wrong when creating user with wallet:" +
            address) as string
        );
      }
      const jsonRes = await res.json();
      return jsonRes;
    } catch (err) {
      console.log(err);
    }
  };