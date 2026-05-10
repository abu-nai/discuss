'use client';

import {
    Input,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
import PersonalButton from '../common/button';
import * as actions from '@/actions';
// useActionState is a hook. Hooks can only be used in client components.
import { useActionState, startTransition } from "react";
import FormButton from '@/components/common/form-button';

export default function TopicCreateForm() {
    // when we call useActionState, we get an array of two elements: the first is our formState and the second is a wrapped up version of our server action
    // the first argument to useActionState is the action that we want to call.
    // ? the second argument is the initial state of our errors object. when we first render our application, there will be no errors so we initialise our state to an empty object.

    const [formState, action, isPending] = useActionState(actions.createTopic, {
        errors: {}
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            action(formData);
        });
    }

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <PersonalButton className="bg-indigo-400/80 rounded-full">
                    Create a Topic
                </PersonalButton>
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Topic</h3>
                        {/* Reminder that the name properties modify how we access the form data inside of the form data object in our server action.  */}
                        <Input 
                            name="name" 
                            label="Name" 
                            labelPlacement="outside"
                            placeholder="Choose a topic name"
                            isInvalid={!!formState.errors.name}
                            errorMessage={formState.errors.name?.join(', ')} />
                        <Textarea 
                            name="description" 
                            label="Description" 
                            labelPlacement="outside" 
                            placeholder="Describe your topic"
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.join(', ')} />

                        {formState.errors._form ? <div className="p-2 bg-red-200 border border-red-400 rounded">{formState.errors._form?.join(', ')}</div> : null}

                        <FormButton isLoading={isPending}>Save</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}