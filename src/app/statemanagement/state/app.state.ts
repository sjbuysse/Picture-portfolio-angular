import {DataState, initialDataState} from './data/data.state';
import {ContainersState, initialContainersState} from './containers/containers.state';

export type AppState = Readonly<{
  data: DataState,
  containers: ContainersState
}>;

export const initialAppState = {
  data: initialDataState,
  constainers: initialContainersState
};
