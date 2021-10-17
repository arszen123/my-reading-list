import React from 'react';
import { Routes } from '..';
import { RouterService } from './router.service';

const MockComponent = (() => undefined) as unknown as React.ComponentType;
const ROUTES: Routes = [
  {
    name: 'index',
    path: '/',
    exact: true,
    component: MockComponent,
  },
  {
    path: '/nested',
    children: [
      {
        name: 'first',
        path: 'first',
        component: MockComponent,
      },
      {
        name: 'last',
        path: '/:param0/last/:param1',
        component: MockComponent,
      },
    ],
  },
  {
    path: '/complex/:param0_:param1-:param2-:param3/:param4',
    name: 'complex',
    component: MockComponent,
  },
  {
    path: '/optional/:param0?/:param1?',
    name: 'optional',
    component: MockComponent,
  },
];

describe('Router', () => {
  let router: RouterService;

  beforeEach(() => {
    router = new RouterService(ROUTES);
  });

  it('should be defined', () => {
    expect(router).toBeDefined();
  });

  it('should return the requested route', () => {
    expect(router.getRoute('index')).toEqual(ROUTES[0]);
  });

  it('should return undefined when a non-existing route is requested', () => {
    expect(router.getRoute('not-exists')).toBeUndefined();
  });

  it('should return a nested route as a Component route', () => {
    expect(router.getRoute('first')).toEqual(expect.objectContaining({
      name: 'first',
      path: '/nested/first',
    }));
  });

  it('should compile route', () => {
    expect(router.compile('last', {
      param0: 'test',
      param1: 'end',
    })).toEqual('/nested/test/last/end');
  });

  it('should compile complex route', () => {
    expect(router.compile('complex', {
      param0: 'i',
      param1: 'am',
      param2: 'a',
      param3: 'HaPpY',
      param4: 'dog',
    })).toEqual('/complex/i_am-a-HaPpY/dog');
  });

  it('should compile route with all the optional params', () => {
    expect(router.compile('optional', {
      param0: 'route',
      param1: 'param',
    })).toEqual('/optional/route/param');
  });

  it('should compile route with a missing optional param', () => {
    expect(router.compile('optional', {
      param0: 'route',
    })).toEqual('/optional/route');
  });

  it('should compile route with all the missing optional params', () => {
    expect(router.compile('optional')).toEqual('/optional');
  });

  it('should throw when a required optional parameter is missing', () => {
    expect(() => router.compile('optional', {
      param1: 'param',
    })).toThrow();
  });
});
