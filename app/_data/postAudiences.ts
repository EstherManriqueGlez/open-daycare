import { mapLocalKidToKid, readLocalKids } from "./localKids";
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
      kind: "kid",
      kidId: kid.id,
      kidName: kid.name,
      kidInitial: kid.initial,
      avatarBg: kid.avatarBg,
      avatarColor: kid.avatarColor,
    },
  };
}

function getPriorityMockKids() {
  return PRIORITY_KID_IDS.map((kidId) => kids.find((kid) => kid.id === kidId)).filter(
    (kid): kid is Kid => Boolean(kid),
  );
}

export function buildNewPostAudienceOptions(): NewPostAudienceOption[] {
  const priorityOptions = getPriorityMockKids().map(mapKidToAudienceOption);
  const priorityIds = new Set(priorityOptions.map((option) => option.id));
  const localOptions = readLocalKids()
    .map(mapLocalKidToKid)
    .filter((kid) => !priorityIds.has(kid.id))
    .map(mapKidToAudienceOption);

  return [
    ...priorityOptions,
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
