'use client';

import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
import * as actions from '@/actions';
import DeleteButton from '@/components/common/delete-button';
import PersonalButton from '../common/button';

interface DeleteTopicFormProps {
    slug: string
}

export default function DeleteTopicForm({ slug }: DeleteTopicFormProps ) {

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <PersonalButton className="text-xs bg-rose-600/60 size-10">✕</PersonalButton>
            </PopoverTrigger>
            <PopoverContent>
                <form action={actions.deleteTopic.bind(null, { slug })}>
                    <div className="flex flex-col gap-4 p-4 w-90">
                        <p className="text-sm font-medium text-center">Are you sure you want to delete this topic?</p>
                        <p className="text-sm font-medium text-center">This action can not be undone!</p>
                        <DeleteButton>
                            Delete!
                        </DeleteButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}