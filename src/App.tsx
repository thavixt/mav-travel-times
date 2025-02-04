import { Header } from "./components/Header";
import useStore, { DEFAULT_AGE, DEFAULT_EMPLOYED, DEFAULT_GENDER, DEFAULT_NAME } from "./store/store";
import { sleep } from "./logic/utils";
import { FormInput, ButtonBar, Form } from "./components/form";
import { Welcome } from "./components/Welcome";
import { FormValues } from "./components/form/Form";

interface Person extends FormValues {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other'
  employed: boolean;
}

const DEFAULT_PERSON: Person = {
  name: DEFAULT_NAME,
  age: DEFAULT_AGE,
  gender: DEFAULT_GENDER,
  employed: DEFAULT_EMPLOYED,
}

function App() {
  const setName = useStore(state => state.setName);
  const setGender = useStore(state => state.setGender);
  const setAge = useStore(state => state.setAge);
  const setEmployed = useStore(state => state.setEmployed);

  const onSubmit = async (formData: Person) => {
    setName(formData.name);
    setGender(formData.gender);
    setAge(formData.age);
    setEmployed(!!formData.employed);
    await sleep();
  };

  return (
    <div className="flex flex-col space-y-8 items-center mx-auto">
      <Header />
      <Welcome/>

      <Form<Person> defaultValues={DEFAULT_PERSON} onSubmit={onSubmit} pendingText="Setting user details">
        <FormInput label="Name" name="name" defaultValue={DEFAULT_PERSON['name']} />
        <FormInput label="Age" name="age" defaultValue={DEFAULT_PERSON['age']} type="number" />
        <FormInput
          label="Gender"
          name="gender"
          defaultValue={DEFAULT_PERSON['gender']}
          type="radio"
          radioOptions={{ male: 'Male', female: 'Female' }}
        />
        <FormInput label="Employed" name="employed" defaultValue={DEFAULT_PERSON['employed']} type="checkbox" />
        <ButtonBar>
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </ButtonBar>
      </Form>

    </div>
  )
}

export default App
