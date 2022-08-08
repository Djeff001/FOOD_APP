import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
  connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedtopology: true,
  } as ConnectOptions).then(
    () => console.log("Connect succefully"),
    (error) => console.log(error)
  );
};
