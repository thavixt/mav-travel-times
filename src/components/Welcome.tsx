import useStore from "../store/store";

export function Welcome() {
  const name = useStore(state => state.name);
  const gender = useStore(state => state.gender);
  const age = useStore(state => state.age);
  const employed = useStore(state => state.employed);

  return (
    <div className="flex flex-col">
      <p>Welcome, {name} ({gender}, age {age}, {employed ? '' : 'un'}employed)</p>
    </div>
  )
}