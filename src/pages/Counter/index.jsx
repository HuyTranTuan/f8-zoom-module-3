import { useSelector, useDispatch } from "react-redux";
import {
    decrement,
    increment,
    incrementByAmount,
    selectCount,
} from "@/features/counter/counterSlice";

function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    return (
        <div>
            <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>
            <span>{count}</span>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
            <button
                aria-label="+5"
                onClick={() => dispatch(incrementByAmount(5))}
            >
                +5
            </button>
        </div>
    );
}

export default Counter;
