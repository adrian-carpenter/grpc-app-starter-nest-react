import AuthorizationGrpcClientFactory from "../AuthorizationGrpcClientFactory";
import { GreetServicePromiseClient } from "../../generated/protos/greet_grpc_web_pb";
import * as GreetApi from '../../generated/protos/greet_pb'


const grpcClient = new AuthorizationGrpcClientFactory(GreetServicePromiseClient)

export default {
  client: grpcClient.client,
  api: GreetApi
}
