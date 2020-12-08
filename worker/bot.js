const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');



const socket = require('socket.io');

const events = require('events');

const redis = require('redis');
const Redis = require('ioredis');
const connectRedis = require('connect-redis');
const connectMongo = require('connect-mongo');
const { REDIS_OPTIONS, SESSION_OPTIONS } = require('./config')