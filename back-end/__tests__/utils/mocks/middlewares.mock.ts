import type { NextFunction, Request, Response } from 'express';

const mockRequest = () => {
  const req = {} as Request;
  return req;
}

const mockResponse = () => {
  const res = {} as Response;
  res.status = () => res;
  res.json = () => res;
  return res;
};

const mockNext = () => {
  const next = (() => {}) as NextFunction;
  return next;
};

export const request = mockRequest();
export const response = mockResponse();
export const next = mockNext();
