"use client";

import { onBlock, onUnblock } from "@/action/block";
import { onFollow, onUnfollow } from "@/action/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
	isFollowing: boolean,
	userId: string;
}


export const Actions = ({
	isFollowing,
	userId,
}: ActionProps) => {
	const [isPending, startTransition] = useTransition();

	const handleFollow = () => {
		startTransition(() => {
			onFollow(userId)
				.then((data) => toast.success(`You are following${data.following.username}`))
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const handleUnfollow = () => {
		startTransition(() => {
			onUnfollow(userId)
				.then((data) => toast.success(`You have unfollowed ${data.following.username}`))
				.catch(() => toast.error("Something went wrong"));
		});
	};
	
	const onClick = () => {
		if (isFollowing) {
			handleUnfollow();
		} else {
			handleFollow();
		}
	}

	const handleBlock = () => {
		startTransition (() => {
			onUnblock(userId)
			.then((data) => toast.success(`UnBlocked the user ${data.blocked.username}`))
			.catch(() => toast.error("Something  went wrong"));
		});
	};

	return (
		<>
		<Button
			disabled={isPending}
			onClick={onClick}
			variant="primary"
		>
			{isFollowing? "Unfollow" : "Follow"}
		</Button>
		<Button onClick={handleBlock} disabled={isPending}>
			Unblock
		</Button>
		</>
	);
};
