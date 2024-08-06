import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedDocument = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    );

    if (!updatedDocument) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json(updatedDocument);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось вернуть статью",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      companyName: req.body.companyName,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedDocument = await PostModel.findOneAndDelete({ _id: postId });

    if (!deletedDocument) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить статью",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedDocument = await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        companyName: req.body.companyName,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      },
      { new: true } // Это опция, которая возвращает обновленный документ
    );

    if (!updatedDocument) {
      console.log(err);
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json({
      success: true,
      data: updatedDocument,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
