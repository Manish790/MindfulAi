import { User } from "../model/user.js";
import { personality as Question } from "../model/personality.js";
import { confession } from "../model/confess.js";
import { mailSender } from "../mail/mailSender.js";
import confessMailSingle from "../mail/confessMail.js";

// update personality

export const updatePersonality = async (req, res) => {
  try {
    const data = req.body;
    const { _id, ...restData } = data;
    restData.mark = true;

    const updatedPersonality = await Question.findByIdAndUpdate(_id, restData, {
      new: true,
    });

    if (!updatedPersonality)
      return res
        .status(400)
        .json({ success: false, message: "Personality not found" });

    return res.status(200).json({
      success: true,
      data: updatedPersonality,
      message: "Personality updated successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

// personality by id

export const personality = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const personality = await Question.findById(id);
    console.log("backend", personality);
    if (!personality)
      return res
        .status(400)
        .json({ success: false, message: "Personality not found" });

    return res.status(200).json({ success: true, data: personality });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

//all confession

export const allConfession = async (req, res) => {
  try {
    const confessionData = await confession.find();
    console.log("confession", confessionData);
    return res.status(200).json({ success: true, data: confessionData });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

//own confession
export const ownConfession = async (req, res) => {
  try {
    const confessionData = await confession.find({ confessBy: req._id });
    console.log("confession", confessionData);
    return res.status(200).json({ success: true, data: confessionData });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

// confess to

export const confessTo = async (req, res) => {
  try {
    const { description, confessTo } = req.body;
    console.log("confession==", req.body);

    // check if confessTo is valid user
    // const user = await User.findById(confessTo);
    // if (!user)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "User not found" });
    // const gender = user.gender;
    // if (req.gender == gender)
    //   return res.status(400).json({
    //     success: false,
    //     message: "You can only confess to opposite gender ",
    //   });

    // console.log("pass1");
    // // check if confessTo is same as confessBy
    // if (req._id == confessTo)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "You can't confess to yourself" });
    // console.log("pass2");

    // check if confessTo is already confessed
    const confess = await confession.findOne({ confessTo, confessBy: req._id });
    console.log("pass3");
    if (confess)
      return res.status(400).json({
        success: false,
        message: "You have already confessed to this user",
      });
    console.log("pass4");

    // create confession
    const confessData = await confession.create({
      description,
      confessBy: req._id,
      confessTo,
    });
    console.log("pass5");
    //   check if confessTo is already confessed
    const confess2 = await confession.findOne({
      confessTo: req._id,
      confessBy: confessTo,
    });
    console.log("pass6");
    if (confess2) {
      const confessedTo = await User.findById(req._id);
      const confessedBy = await User.findById(confessTo);
      await mailSender(
        confessedTo.email,
        "Confession Accepted",
        confessMailSingle(confessedBy, description)
      );
      await mailSender(
        confessedBy.email,
        "Confession Accepted",
        confessMailSingle(confessedTo, confessData.description)
      );
      console.log("Your Crush has Already Confessed You");
      //send mail to all user
      // select only email from all user
      // const users=await User.find().select('email');
      // //iterate over all user and send mail
      // users.forEach(async(user)=>{
      //     await mailSender(user.email,"New Confession match",);
      // })
    } else {
      //   await mailSender(user.email,"New Confession",);
      console.log("Crush Tak Confession Pahunch Gya...");
    }
    console.log("confession", confessData);
    return res.status(200).json({ success: true, data: confessData });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

// sort user by similar personality

export const similarPersonality = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve personality traits of the specified user
    const user = await Question.findOne({ userId:id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Retrieve personality traits of all users except the specified user
    const users = await Question.find({
      userId: { $ne: id },
      userGender: { $ne: user.userGender }, // Assuming you want to filter by gender as well
    });

    // Calculate cosine similarity for each user
    const similarUsers = users.map((otherUser) => {
      const similarityScore = computeCosineSimilarity(user, otherUser);
      return { userId: otherUser.userId, similarityScore };
    });

    // Sort users by similarity score in descending order
    similarUsers.sort((a, b) => b.similarityScore - a.similarityScore);

    // Extract only the userIds of similar users
    const similarUserIds = similarUsers.map((user) => user.userId);

    return res.status(200).json({ success: true, data: similarUserIds});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to compute cosine similarity between two users based on their personality traits
function computeCosineSimilarity(userA, userB) {
  const vectorA = Object.values(userA).slice(2); // Exclude userId and userGender
  const vectorB = Object.values(userB).slice(2); // Exclude userId and userGender

  // Compute dot product
  const dotProduct = vectorA.reduce(
    (acc, val, index) => acc + val * vectorB[index],
    0
  );

  // Compute magnitudes
  const magnitudeA = Math.sqrt(
    vectorA.reduce((acc, val) => acc + val * val, 0)
  );
  const magnitudeB = Math.sqrt(
    vectorB.reduce((acc, val) => acc + val * val, 0)
  );

  // Compute cosine similarity
  const cosineSimilarity = dotProduct / (magnitudeA * magnitudeB);
  return cosineSimilarity;
}

export const allUser = async (req, res) => {
  try {
    // find all user not equal to current user
    console.log("current user", req._id);
    const users = await User.find({ _id: { $ne: req._id } }).select(
      "-password"
    );

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get single user

export const singleUser = async (req, res) => {
  try {
    // find all user not equal to current user
    const { id } = req.params;
    const user = await User.findById(id)
      .select("-password")
      .populate("personality");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const dataset = async (req, res) => {
  try {
    const questions = await Question.find({});
    return res.json(questions);
  } catch (error) {
    console.error("Error fetching dataset:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
