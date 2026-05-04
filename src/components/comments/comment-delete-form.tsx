'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import PersonalButton from '../common/button';

interface DeleteCommentFormProps {
    commentId: string,
    postId: string,
    slug: string
}

export default function DeleteCommentForm({ commentId, postId, slug }: DeleteCommentFormProps ) {
    const [_formState, action, isPending] = useActionState(actions.deleteComment.bind(null, { commentId, postId, slug }), { errors: {} })

    return (
        <Popover placement="right">
            <PopoverTrigger>
                <PersonalButton className="text-xs bg-rose-600/60">
                    Delete
                </PersonalButton>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-90">
                        <p className="text-sm font-medium text-center">Are you sure you want to delete this comment?</p>
                        <p className="text-sm font-medium text-center">This action can not be undone!</p>
                        <FormButton isLoading={isPending}>
                            Yes, Delete!
                        </FormButton>
                    </div>
            </form>
            </PopoverContent>
        </Popover>
    )
}