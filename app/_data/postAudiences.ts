import { mapLocalKidToKid } from "./localKids";
import type { LocalKid } from "./localKids";
import type { NewPostAudience } from "./localFeedPosts";
import { kids } from "./mock";
import type { Kid } from "./mock";

const PRIORITY_KID_IDS = ["mateo-fernandez", "sofia-mendez", "benjamin-ruiz"];

export interface NewPostAudienceOption {
  id: string;
  label: string;
  audience: NewPostAudience;
}

function mapKidToAudienceOption(kid: Kid): NewPostAudienceOption {
  return {
    id: kid.id,
    label: kid.name.split(" ")[0] || kid.name,
    audience: {
      kind: "kids",
      kids: [
        {
          kidId: kid.id,
          kidName: kid.name,
          kidInitial: kid.initial,
          avatarBg: kid.avatarBg,
          avatarColor: kid.avatarColor,
        },
      ],
    },
  };
}

function getOrderedMockKids() {
  const priorityKids = PRIORITY_KID_IDS.map((kidId) => kids.find((kid) => kid.id === kidId)).filter(
    (kid): kid is Kid => Boolean(kid),
  );
  const priorityIds = new Set(priorityKids.map((kid) => kid.id));

  return [...priorityKids, ...kids.filter((kid) => !priorityIds.has(kid.id))];
}

export function buildNewPostAudienceOptions(localKids: LocalKid[] = []): NewPostAudienceOption[] {
  const mockOptions = getOrderedMockKids().map(mapKidToAudienceOption);
  const mockIds = new Set(mockOptions.map((option) => option.id));
  const localOptions = localKids
    .map(mapLocalKidToKid)
    .filter((kid) => !mockIds.has(kid.id))
    .map(mapKidToAudienceOption);

  return [
    ...mockOptions,
    ...localOptions,
    {
      id: "room",
      label: "Toda la sala",
      audience: { kind: "room", label: "Toda la sala" },
    },
  ];
}

export function getDefaultNewPostAudience(options = buildNewPostAudienceOptions()) {
  return options[0]?.audience ?? { kind: "room", label: "Toda la sala" };
}
