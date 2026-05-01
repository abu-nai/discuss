'use client';

import { useActionState } from 'react';
import {
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';

interface DeleteTopicFormProps {
    slug: string
}

export default function DeleteTopicForm({ slug }: DeleteTopicFormProps ) {
    const [formState, action, isPending] = useActionState(actions.deleteTopic.bind(null, { slug }), { errors: {} });

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="danger" variant="bordered">✕</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-90">
                        <p className="text-sm font-medium text-center">Are you sure you want to delete this topic?</p>
                        <p className="text-sm font-medium text-center">This action can not be undone!</p>
                        <FormButton isLoading={isPending}>
                            Delete!
                        </FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}