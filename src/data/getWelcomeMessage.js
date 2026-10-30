import welcomeMessages from "./welcomeMessages.json";

export function getWelcomeMessage(date = new Date()) {
  const activeMessage = welcomeMessages.scheduledMessages
    .filter((message) => {
      if (!message.startsAt && !message.endsAt) return false;
      const startsAt = message.startsAt ? Date.parse(message.startsAt) : -Infinity;
      const endsAt = message.endsAt ? Date.parse(message.endsAt) : Infinity;
      return date.getTime() >= startsAt && date.getTime() <= endsAt;
    })
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0];

  return activeMessage?.text ?? welcomeMessages.defaultMessage.text;
}
