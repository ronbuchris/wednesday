const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const criteria = _buildCriteria(filterBy)
        const sortCriteria = _buildSortCriteria(filterBy)
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).sort(sortCriteria).toArray()
        console.log(`toys`, toys)
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        const addedToy = await collection.insertOne(toy)
        return addedToy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}
async function update(toy) {
    try {
        var id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ "_id": id }, { $set: { ...toy } })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

async function getLabels() {
    const labels = [];
    const numbers = {}
    const criteria = {}
    try {
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                numbers[label] ? numbers[label]++ : numbers[label] = 1
                if (!labels.includes(label)) {
                    labels.push(label)
                }
            })
        })
        return { numbers, labels }
    } catch (err) {
        logger.error('cannot load labels', err)
        throw err
    }
}
function _buildSortCriteria(filterBy){
    switch(filterBy.sortBy) {
        case 'createdAt-first':return {createdAt:1}
        case 'createdAt-last':return {createdAt:-1}
        case 'name-a':return {name:1}
        case 'name-z':return {name:-1}
        case 'price-low':return {price:1}
        case 'price-high':return {price:-1}
        default:return {}
    }
}

function _buildCriteria(filterBy){
    if((Object.keys(filterBy).length===0))return{}
    var criteria ={}
    if(filterBy.labels&&filterBy.labels.length){
        filterBy.label=filterBy.labels.map(labelObject=>JSON.parse(labelObject))
        criteria={
            labels:{$in:filterBy.labels.map(labelObject=>labelObject.value)}
        }
    }
    if(filterBy.inStock==='true') criteria.inStock=true
    const regex = new RegExp(filterBy.searchKey,'i');
    criteria.$or=[{name:regex},{details:regex}]
    return criteria;
}


module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    getLabels
}