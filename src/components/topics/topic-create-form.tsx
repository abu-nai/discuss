'use client';

import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
import * as actions from '@/actions';
// useActionState is a hook. Hooks can only be used in client components.
import { useActionState } from "react";

export default function TopicCreateForm() {
    // when we call useActionState, we get an array of two elements: the first is our formState and the second is a wrapped up version of our server action
    // the first argument to useActionState is the action that we want to call.
    // the second argument is

    const [formState, action] = useActionState(actions.createTopic, {
        errors: {}
    });

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">
                    Create a Topic
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Topic</h3>
                        {/* Reminder that the name properties modify how we access the form data inside of the form data object in our server action.  */}
                        <Input name="name" label="Name" labelPlacement="outside" placeholder="name" />
                        <Textarea name="description" label="Description" labelPlacement="outside" placeholder="Describe your topic" />
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}