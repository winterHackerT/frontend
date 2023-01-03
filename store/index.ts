import { getAccessorType, mutationTree, actionTree } from 'typed-vuex';

export const prefix = 'wiki.';

export const state = () => ({});

type RootState = ReturnType<typeof state>;

export const getState = (name: string, defaultValue: string = '') => {
  name = prefix + name;
  let value = localStorage.getItem(name);

  if (value === null) {
    value = defaultValue;
    localStorage.setItem(name, value);
  }

  return value;
};

export const setState = (name: string, value: string) => {
  localStorage.setItem(prefix + name, value);
};

export const getters = {
  hello: (_state: RootState) => getState('hello'),
};

export const mutations = mutationTree(state, {
  setHello: (_state, newValue: string) => setState('hello', newValue),
});

export const actions = actionTree(
  { state, getters, mutations },
  {}
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
  },
});
