mongosh -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<EOF
    use $MONGO_INITDB_DATABASE;
    db.createUser({
        user: '$MONGO_INITDB_ROOT_USERNAME',
        pwd: '$MONGO_INITDB_ROOT_PASSWORD',
        roles: [{
            role: 'readWrite',
            db: '$MONGO_INITDB_DATABASE'
        }]
    });
EOF