// backend/routes/api/accounts.js
const express = require("express");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Account, User, Order, Contact, Action } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { body, validationResult, query } = require("express-validator");

const { formatDate } = require("../../utils/helperFunctions");

const router = express.Router();

// Find Account by id
router.get("/company/:accountId", async (req, res, next) => {
  const accountId = req.params.accountId;
  try {
    const account = await Account.findByPk(req.params.accountId, {
      include: [
        {
          model: Order,
          as: "orders",
        },
        {
          model: Action,
          as: "actions"
        },
        {
          model: Contact,
          as: "contacts"
        }
      ],
    });
    if (!account) {
      res.status(404).json({ error: "Account not found" });
      return;
    }

    res.status(200).json(account);
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Account Order
router.get("/orders/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        model: Account,
        as: "account", 
      },
    });
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Create Account Oder
router.post("/company/:id/orders", requireAuth, async (req, res, next) => {
  const { id } = req.params;
  const { vin, model, year, price, tax, license, bodies, extras, notes, condition } =
    req.body;
  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return "No account found", res;
    }

    if (account.ownerId !== req.user.id) {
      return res.status(401).json({
        message: "Account does not belong to user",
      });
    }

    const newOrder = await account.createOrder({
      accountId: id,
      vin,
      model,
      year,
      price,
      tax,
      license,
      bodies,
      extras,
      condition,
      notes,
    });

    const formattedResponse = {
      id: newOrder.id,
      accountId: newOrder.accountId,
      vin: newOrder.vin,
      model: newOrder.model,
      year: newOrder.year,
      price: newOrder.price,
      tax: newOrder.tax,
      license: newOrder.license,
      bodies: newOrder.bodies,
      extras: newOrder.extras,
      condition: newOrder.condition,
      notes: newOrder.notes,
      createdAt: newOrder.createdAt,
      updatedAt: newOrder.updatedAt,
    };

    return res.json(formattedResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Order
router.put("/company/:orderId/orders", requireAuth, async (req, res, next) => {
  const orderId = req.params.orderId;
  const updatedOrderData = req.body; // Ensure that req.body only contains fields you want to update

  try {
    const rowsUpdated = await Order.update(updatedOrderData, {
      where: { id: orderId },
    });

    if (rowsUpdated[0] === 0) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    const updatedOrder = await Order.findByPk(orderId); // Fetch the updated Order separately

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating Order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create Account Action
router.post("/company/:id/actions", requireAuth, async (req, res, next) => {
  const { id } = req.params;
  const { report, details, reminder } =
    req.body;
  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return "No account found", res;
    }

    if (account.ownerId !== req.user.id) {
      return res.status(401).json({
        message: "Account does not belong to user",
      });
    }

    const newAction = await account.createAction({
      accountId: id,
      report,
      details,
      reminder,
    });

    const formattedResponse = {
      id: newAction.id,
      accountId: newAction.accountId,
      report: newAction.report,
      details: newAction.details,
      reminder: newAction.reminder,
      createdAt: newAction.createdAt,
      updatedAt: newAction.updatedAt,
    };

    return res.json(formattedResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Action
router.put("/company/:actionId/actions/:actionId", requireAuth, async (req, res, next) => {
  const actionId = req.params.actionId;
  const updatedActionData = req.body; // Ensure that req.body only contains fields you want to update

  try {
    const rowsUpdated = await Action.update(updatedActionData, {
      where: { id: actionId },
    });

    if (rowsUpdated[0] === 0) {
      res.status(404).json({ error: "Action not found" });
      return;
    }

    const updatedAction = await Action.findByPk(actionId); // Fetch the updated Contact separately

    res.status(200).json(updatedAction);
  } catch (error) {
    console.error("Error updating Action:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create Account Contact
router.post("/company/:id/contacts", requireAuth, async (req, res, next) => {
  const { id } = req.params;
  const { name, position, phone, email } =
    req.body;
  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return "No account found", res;
    }

    if (account.ownerId !== req.user.id) {
      return res.status(401).json({
        message: "Account does not belong to user",
      });
    }

    const newContact = await account.createContact({
      accountId: id,
      name,
      position,
      phone,
      email,
    });

    const formattedResponse = {
      id: newContact.id,
      accountId: newContact.accountId,
      name: newContact.name,
      position: newContact.position,
      phone: newContact.phone,
      email: newContact.email,
      createdAt: newContact.createdAt,
      updatedAt: newContact.updatedAt,
    };

    return res.json(formattedResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Contact
router.put("/company/:contactId/contacts", requireAuth, async (req, res, next) => {
  const contactId = req.params.contactId;
  const updatedContactData = req.body; // Ensure that req.body only contains fields you want to update

  try {
    const rowsUpdated = await Contact.update(updatedContactData, {
      where: { id: contactId },
    });

    if (rowsUpdated[0] === 0) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }

    const updatedContact = await Contact.findByPk(contactId); // Fetch the updated Contact separately

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating Contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Account
router.put("/:accountId", requireAuth, async (req, res, next) => {
  const accountId = req.params.accountId;
  const updatedAccountData = req.body; // Ensure that req.body only contains fields you want to update

  try {
    const rowsUpdated = await Account.update(updatedAccountData, {
      where: { id: accountId },
    });

    if (rowsUpdated[0] === 0) {
      res.status(404).json({ error: "Account not found" });
      return;
    }

    const updatedAccount = await Account.findByPk(accountId); // Fetch the updated account separately

    res.status(200).json(updatedAccount);
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Account
router.delete("/company/:accountId", requireAuth, async (req, res, next) => {
  const accountId = req.params.accountId;
  const destroyAccount = await Account.findByPk(accountId);

  if (!destroyAccount) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  await destroyAccount.destroy();

  return res.json({
    message: "Account deleted successfully",
  });
});

// Delete Action
router.delete("/actions/:actionId", requireAuth, async (req, res, next) => {
  const actionId = req.params.actionId;
  const destroyAction = await Action.findByPk(actionId);

  if (!destroyAction) {
    return res.status(404).json({
      message: "Action not found",
    });
  }

  await destroyAction.destroy();

  return res.json({
    message: "Action deleted successfully",
  });
});

// Delete Contact
router.delete("/contacts/:contactId", requireAuth, async (req, res, next) => {
  const contactId = req.params.contactId;
  const destroyContact = await Contact.findByPk(contactId);

  if (!destroyContact) {
    return res.status(404).json({
      message: "Contact not found",
    });
  }

  await destroyContact.destroy();

  return res.json({
    message: "Contact deleted successfully",
  });
});

// Delete Order
router.delete("/orders/:orderId", requireAuth, async (req, res, next) => {
  const orderId = req.params.orderId;
  const destroyOrder = await Order.findByPk(orderId);

  if (!destroyOrder) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  await destroyOrder.destroy();

  return res.json({
    message: "Order deleted successfully",
  });
});

// Get all Accounts for current user
router.get("/current", requireAuth, async (req, res, next) => {
  const account = await Account.findAll({
    where: {
      ownerId: req.user.id,
    },
    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id"],
      },
      {
        model: Order,
        as: "orders",
      },
      {
        model: Contact,
        as: "contacts"
      },
      {
        model: Action,
        as: "actions"
      }
    ],
  });

  if (!account) {
    return res.json({
      message: "no accounts found",
    });
  }

  return res.json(account);
});

// Create Account
router.post("/", async (req, res, next) => {
  req.body.ownerId = req.user.id;
  const {
    ownerId,
    companyName,
    businessType,
    fleetSize,
    equipmentType,
    lookingFor,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    address2,
    state,
    city,
    zipCode,
    notes,
  } = req.body;

  Account.create({
    ownerId: req.user.id,
    companyName,
    businessType,
    fleetSize: fleetSize,
    equipmentType: equipmentType,
    lookingFor: lookingFor,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    address2: address2,
    state: state,
    city: city,
    zipCode: zipCode,
    notes: notes,
  })
    .then((response) => {
      console.log(response, "response in backend");
      res.json(response);
    })
    .catch((err) => {
      console.log("Error adding account", err);
    });
});

// Find by businessType
router.get("/businessType/:business", async (req, res) => {
  const { business } = req.params;
  const company = await Account.findAll({
    where: {
      ownerId: req.user.id,
      businessType: req.params.business,
    },
    include:[ 
      {
      model: Order,
      as: "orders", 
    },
    {
      model: Action,
      as: "actions"
    }
  ]
  });
  return res.json(company);
});

// Find by EquipmentType
router.get("/equipmentType/:equipment", requireAuth, async (req, res, next) => {
  const { equipment } = req.params;
  try {
    const accounts = await Account.findAll({
      where: {
        ownerId: req.user.id,
        equipmentType: {
          [Op.substring]: req.params.equipment,
        },
      },
      include:[ 
        {
        model: Order,
        as: "orders", 
      },
      {
        model: Action,
        as: "actions"
      }
    ]
      });

    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

// Find by CompanyName
router.get("/companyName/:companyName", requireAuth, async (req, res) => {
  const { companyName } = req.params;
  Account.findAll({
    where: {
      ownerId: req.user.id,
      companyName: {
        [Op.substring]: companyName,
      },
    },
    include:[ 
      {
      model: Order,
      as: "orders", 
    },
    {
      model: Action,
      as: "actions"
    }
  ]
  })
    .then((companyName) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(companyName);
    })
    .catch((err) => next(err));
});

// Find by LookingFor
router.get("/lookingFor/:equipment", requireAuth, async (req, res, next) => {
  const { equipment } = req.params;
  Account.findAll({
    where: {
      ownerId: req.user.id,
      lookingFor: {
        [Op.substring]: req.params.equipment,
      },
    },
    include:[ 
      {
      model: Order,
      as: "orders", 
    },
    {
      model: Action,
      as: "actions"
    }
  ]
  })
    .then((equipment) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(equipment);
    })
    .catch((err) => next(err));
});

// Find by City
router.get("/location/:city", requireAuth, async (req, res, next) => {
  const { city } = req.params;
  const accounts = await Account.findAll({
    where: {
      ownerId: req.user.id,
      city: city,
    },
    include:[ 
      {
      model: Order,
      as: "orders", 
    },
    {
      model: Action,
      as: "actions"
    }
  ]

  })
    .then((accounts) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(accounts);
    })
    .catch((err) => next(err));
});

module.exports = router;

