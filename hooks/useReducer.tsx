import React, { useReducer} from "React";

const TodoDispatch = React.createContext(null);

const TodosApp: React.FunctionComponet<...> = props => {
    const [todos,dispatch] = useReducer(TodoDispatch);

    return (
        <TodoDispatch.provider value={dispatch}>
            <DeepTree todos={todos}/>
        </TodoDispatch.provider>
    )
}

function DeepChild(props) {
    // 如果我们想要执行一个 action，我们可以从 context 中获取 dispatch。
    const dispatch = useContext(TodosDispatch);
  
    function handleClick() {
      dispatch({ type: 'add', text: 'hello' });
    }
  
    return (
      <button onClick={handleClick}>Add todo</button>
    );
  }



使用useState 每一层手动传递回调，像错综复杂的管道一样 显得很麻烦.
在大型组件书中，推荐的替代方案是通过context用useReducer往下传递一个dispatch函数;
dispatch能给那些会触发深更新的组件做性能优化（因为可以向下传递dispatch而不是回调函数)


const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变