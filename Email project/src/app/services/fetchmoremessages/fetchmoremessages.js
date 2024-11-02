export default async function fetchmoreMessages(
  nextPageToken,
  setMessages,
  setLoading,
  accesstoken,
  apiconnector,
  setNextPageToken,
  setshow
) {
  //   setMessages([]);
  if (!accesstoken) return;
  setLoading(true);
  try {
    const params = new URLSearchParams({ maxResults: 15 });
    if (nextPageToken) {
      params.append("pageToken", nextPageToken);
    }

    const response = await apiconnector(
      "GET",
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?${params.toString()}`,
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

    setMessages((prevMessages) => [...prevMessages, ...messageDetails]);
    setNextPageToken(response.data.nextPageToken);
  } catch (error) {
    console.error("Error fetching messages:", error);
  } finally {
    setLoading(false);
    setshow({
      inbox: true,
      drafts: false,
      todo: false,
      trash: false,
      sent: false,
      spam: false,
    });
  }
}
