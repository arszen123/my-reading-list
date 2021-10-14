import React from 'react';
import { ComponentRoutes, Routes } from '../types/route.type';
import { flattenRoutes } from './flatten-routes';

const MockComponent = (() => undefined) as unknown as React.ComponentType;

describe('flattenRoutes', () => {
  it('should be defined', () => {
    expect(flattenRoutes).toBeDefined();
  });

  it('should return the input when there is no nested routes', () => {
    const inputData: Routes = [
      {
        path: '/test',
        name: 'test',
        component: MockComponent,
      },
    ];

    expect(flattenRoutes(inputData)).toEqual(inputData);
  });

  it('should flatten the nested routes', () => {
    const inputData: Routes = [
      {
        path: '/test',
        children: [
          {
            path: '/level1',
            children: [
              {
                path: '',
                name: 'level1',
                component: MockComponent,
              },
              {
                path: 'level2',
                name: 'level2',
                component: MockComponent,
              },
            ],
          },
        ],
      },
    ];

    const expected: ComponentRoutes = [
      {
        path: '/test/level1',
        name: 'level1',
        component: MockComponent,
      },
      {
        path: '/test/level1/level2',
        name: 'level2',
        component: MockComponent,
      },
    ];

    expect(flattenRoutes(inputData)).toEqual(expected);
  });

  it('should remove unnecessary "/"-es', () => {
    const inputData: Routes = [
      {
        path: '//test///slash///removal//',
        name: 'test',
        component: MockComponent,
      },
    ];

    const expected: ComponentRoutes = [
      {
        path: '/test/slash/removal',
        name: 'test',
        component: MockComponent,
      },
    ];

    expect(flattenRoutes(inputData)).toEqual(expected);
  });
});
