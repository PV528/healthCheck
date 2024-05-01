// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var rental_pb = require('./rental_pb.js');

function serialize_org_acme_HealthCheckRequest(arg) {
  if (!(arg instanceof rental_pb.HealthCheckRequest)) {
    throw new Error('Expected argument of type org.acme.HealthCheckRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_org_acme_HealthCheckRequest(buffer_arg) {
  return rental_pb.HealthCheckRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_org_acme_HealthCheckResponse(arg) {
  if (!(arg instanceof rental_pb.HealthCheckResponse)) {
    throw new Error('Expected argument of type org.acme.HealthCheckResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_org_acme_HealthCheckResponse(buffer_arg) {
  return rental_pb.HealthCheckResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RentalServiceService = exports.RentalServiceService = {
  check: {
    path: '/org.acme.RentalService/Check',
    requestStream: false,
    responseStream: false,
    requestType: rental_pb.HealthCheckRequest,
    responseType: rental_pb.HealthCheckResponse,
    requestSerialize: serialize_org_acme_HealthCheckRequest,
    requestDeserialize: deserialize_org_acme_HealthCheckRequest,
    responseSerialize: serialize_org_acme_HealthCheckResponse,
    responseDeserialize: deserialize_org_acme_HealthCheckResponse,
  },
};

exports.RentalServiceClient = grpc.makeGenericClientConstructor(RentalServiceService);
