module.exports = Ferdi => {
  const getMessages = () => {
    // All unread messages
    const unreadAll = getUnreadCount('top_left_all_messages');

    // Private messages
    const unreadPrivate = getUnreadCount('top_left_private_messages');

    // @ Mentions messages
    const unreadMentions = getUnreadCount('top_left_mentions');

    const directMessages = unreadPrivate + unreadMentions;
    const indirectMessages = unreadAll - directMessages;

    Ferdi.setBadge(directMessages, indirectMessages);
  };

  Ferdi.loop(getMessages);

  function getUnreadCount(eltClassName) {
    const elt = document.querySelectorAll(`#global_filters .${eltClassName} .unread_count`)[0];
    if (elt == null) {
      return 0;
    }
    return Ferdi.safeParseInt(elt.textContent);
  }
};
