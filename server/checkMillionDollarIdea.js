//Verify that an idea is worth at least 1M 
const checkMillionDollarIdea = (req, res, next) => {
    console.log('Check \$1M idea');

    //verify that expected parameters are included
    if(req.body.numWeeks && req.body.weeklyRevenue){
        let revenue = Number.parseInt(req.body.numWeeks)
                    *Number.parseFloat(req.body.weeklyRevenue);
        console.log('Expected Rev: '+revenue);
        if(revenue >= 1000000){
            console.log('\t\tAcceptable Idea');
            next();
            return;
        }
        else{
            console.log('\t\tNot enough revenue. Idea rejected');
        }
    }
    res.status(400).send();

};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
