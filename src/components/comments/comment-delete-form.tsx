'use client';

import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
import * as actions from '@/actions';
import DeleteButton from '@/components/common/delete-button';
import PersonalButton from '../common/button';

interface DeleteCommentFormProps {
    commentId: string,
    postId: string,
    slug: string
}

export default function DeleteCommentForm({ commentId, postId, slug }: DeleteCommentFormProps ) {

    return (
        <Popover placement="right">
            <PopoverTrigger>
                <PersonalButton className="text-xs bg-rose-600/60">
                    Delete
                </PersonalButton>
            </PopoverTrigger>
            <PopoverContent>
                <form action={actions.deleteComment.bind(null, { commentId, postId, slug })}>
                    <div className="flex flex-col gap-4 p-4 w-90">
                        <p className="text-sm font-medium text-center">Are you sure you want to delete this comment?</p>
                        <p className="text-sm font-medium text-center">This action can not be undone!</p>
                        <DeleteButton>
                            Yes, Delete!
                        </DeleteButton>
                    </div>
            </form>
            </PopoverContent>
        </Popover>
    )
}