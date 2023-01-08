import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'

export const prefix = 'wiki.'

export const state = () => ({})

type RootState = ReturnType<typeof state>

export const getState = (name: string, defaultValue: string = '') => {
  name = prefix + name
  let value = localStorage.getItem(name)

  if (value === null) {
    value = defaultValue
    localStorage.setItem(name, value)
  }

  return value
}

export const setState = (name: string, value: string) => {
  localStorage.setItem(prefix + name, value)
}

export const getters = {
  hello: (_state: RootState) => getState('hello'),
  title: (_state: RootState) => getState('title', 'Hack WIKI'),
  darkmode: (_state: RootState) => getState('darkmode', 'false'),
  api: (_state: RootState) => 'http://localhost:8081',
}

export const mutations = mutationTree(state, {
  setHello: (_state, newValue: string) => setState('hello', newValue),
  setTitle: (_state, newValue: string) => setState('title', newValue),
  setDarkmode: (_state, newValue: string) => setState('darkmode', newValue),
})

export const actions = actionTree({ state, getters, mutations }, {})

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {},
})
