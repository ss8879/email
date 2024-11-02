export default async function fetchDrafts(
  setdrafts,
  setLoading,
  apiconnector,
  accesstoken,
  setNextPageToken,
  setshow
) {
  setdrafts([]);
  if (!accesstoken) return;
  setLoading(true);
  try {
    // const params = new URLSearchParams({ maxResults: 15 });
    // if (pageToken) {
    //   params.append("pageToken", pageToken);
    // }

    const response = await apiconnector(
      "GET",
      `https://gmail.googleapis.com/gmail/v1/users/me/drafts?key=AIzaSyAMKyepL3tEMVz1Ip2l4-n74R85hVnlCUo`,
      null,
      {
        Authorization: `Bearer ${accesstoken}`,
      }
    );
    console.log("draft response:", response);
    const messageDetails = await Promise.all(
      response.data.drafts.map(async (o) => {
        const messageResponse = await apiconnector(
          "GET",
          `https://gmail.googleapis.com/gmail/v1/users/me/drafts/${o.id}?key=AIzaSyAMKyepL3tEMVz1Ip2l4-n74R85hVnlCUo`,
          null,
          {
            Authorization: `Bearer ${accesstoken}`,
          }
        );
        console.log("res value:", messageResponse);
        const { id, payload, internalDate, threadId } =
          messageResponse.data.message;
        const { headers } = messageResponse.headers;
        return {
          draftid: o.id,
          id,
          payload,
          internalDate,
          threadId,
          headers,
        };
      })
    );

    setdrafts((prevMessages) => [...prevMessages, ...messageDetails]);
    setNextPageToken(response.data.nextPageToken);
  } catch (error) {
    console.error("Error fetching messages:", error);
  } finally {
    setLoading(false);
    setshow({
      inbox: false,
      drafts: true,
      todo: false,
      trash: false,
      sent: false,
      spam: false,
    });
  }
}
