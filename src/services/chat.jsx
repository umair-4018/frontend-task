import { actions } from "../reducers/ConversationReducer";
export const openAIChat = async (dispatch,message, selectedCategory) => {
  let systemBehaviour = "";

  switch (selectedCategory) {
    case "contentWriting":
      systemBehaviour = `Compose a comprehensive article on ${message} that covers [Key Points/Aspects], provides valuable insights, and engages the reader with a compelling introduction and a memorable conclusion.`;
      break;
    case "branding":
      systemBehaviour = `Hello, ChatGPT! We're looking for fresh branding ideas for our new ${message}. We need a unique and captivating concept that reflects our brand's identity and values. Think outside the box and consider the target audience. What branding strategies or visual elements do you recommend to make our product stand out in a competitive market? Your creativity and insights are greatly appreciated`;
      break;
    case "coding":
      systemBehaviour = `Write code to implement the following functionality: ${message}.`;
      break;
    default:
      break;
  }
const retrievedConversationId = localStorage.getItem("conversationId");
  try {
    const data = {
      category: selectedCategory,
      content: message,
      behaviour: systemBehaviour,
      conversationId: retrievedConversationId ? retrievedConversationId : null,
    };
    const result = await actions.submitPrompt(dispatch, data);
    if (result?.status === 200) {
      localStorage.setItem("conversationId", result?.data?.conversationId);
      return result?.data.data;
    }
  } catch (error) {
    console.error(error, "error");
  }
};
// import { actions } from "../reducers/ConversationReducer";
// import { getConversationId, setConversationId } from "../common/config/AuthSettings";
// export const openAIChat = async (dispatch,message, selectedCategory) => {

//   let systemBehaviour = "";

//   switch (selectedCategory) {
//     case "contentWriting":
//       systemBehaviour = `Compose a comprehensive article on ${message} that covers [Key Points/Aspects], provides valuable insights, and engages the reader with a compelling introduction and a memorable conclusion.`;
//       break;
//     case "branding":
//       systemBehaviour = `Hello, ChatGPT! We're looking for fresh branding ideas for our new ${message}. We need a unique and captivating concept that reflects our brand's identity and values. Think outside the box and consider the target audience. What branding strategies or visual elements do you recommend to make our product stand out in a competitive market? Your creativity and insights are greatly appreciated`;
//       break;
//     case "coding":
//       systemBehaviour = `Write code to implement the following functionality: ${message}.`;
//       break;
//     default:
//       break;
//   }
//   const retrievedConversationId=getConversationId()
//   try {
//     const data = {
//       category: selectedCategory,
//       content: message,
//       behaviour: systemBehaviour,
//       conversationId: retrievedConversationId? retrievedConversationId: null,
//     };

//     const result = await actions.submitPrompt(dispatch, data);
//     if (result?.status === 200) {
//     setConversationId(result)
//       return result?.data.data;
//     }
//   } catch (error) {
//     console.error(error, "error");
//   }
// };

