import AuthorizationGrpcClientFactory from "../AuthorizationGrpcClientFactory";
import { HeroServicePromiseClient } from "../../generated/protos/hero_grpc_web_pb";
import * as HeroApi from '../../generated/protos/hero_pb'


const grpcClient = new AuthorizationGrpcClientFactory(HeroServicePromiseClient)

export default {
  client: grpcClient.client,
  api: HeroApi
}
