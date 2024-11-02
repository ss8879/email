export default async function fetchspam(
  setspam,
  setLoading,
  apiconnector,
  accesstoken,
  setspam,
  spamsetNextPageToken,
  setshow
) {
  setspam([]);
  if (!accesstoken) return;
  setLoading(true);
  try {
    const response = await apiconnector(
      "GET",
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?includeSpamTrash=true&labelIds=SPAM&maxResults=15`,
      null,
      {
        Authorization: `Bearer ${accesstoken}`,
      }
    );

    const messageDetails = await Promise.all(
      response.data.messages.map(async (o) => {
        const messageResponse = await apiconnector(
          "GET",
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${o.id}`,
          null,
          {
            Authorization: `Bearer ${accesstoken}`,
          }
        );
        const { payload, snippet, internalDate } = messageResponse.data;
        const headers = payload.headers;

        const senderHeader = headers.find((header) => header.name === "From");
        const sender = senderHeader ? senderHeader.value : "Unknown Sender";

        const time = new Date(parseInt(internalDate)).toLocaleString();

        return { msgid: o.id, sender, snippet, time };
      })
    );

    setspam((prevMessages) => [...prevMessages, ...messageDetails]);
    spamsetNextPageToken(response.data.nextPageToken);
  } catch (error) {
    console.error("Error fetching messages:", error);
  } finally {
    setLoading(false);
    setshow({
      inbox: false,
      drafts: false,
      todo: false,
      trash: false,
      sent: false,
      spam: true,
    });
  }
}
