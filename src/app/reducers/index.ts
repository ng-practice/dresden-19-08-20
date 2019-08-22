import { InjectionToken } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';
import {
  Action,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface State {
  router: fromRouter.RouterReducerState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    router: fromRouter.routerReducer
  })
});

const routerFeature = createFeatureSelector<fromRouter.RouterReducerState>(
  'router'
);

export const { selectRouteParam } = fromRouter.getSelectors(routerFeature);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
