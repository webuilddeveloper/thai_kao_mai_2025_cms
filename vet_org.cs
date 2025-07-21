public static FilterDefinition<T> filterOrganization<T>(this Criteria param)
        {
            if (!string.IsNullOrEmpty(param.profileCode))
            {
                param.organization = new List<Organization>();

                //get Organization
                var col = new Database().MongoClient<Register>("register");
                var filter = Builders<Register>.Filter.Eq("code", param.profileCode);
                var doc = col.Find(filter).Project(c => c.countUnit).FirstOrDefault();

                var model = JsonConvert.DeserializeObject<List<CountUnit>>(doc);

                model.ForEach(c =>
                {
                    param.organization.Add(new Organization
                    {
                        lv0 = c.lv0,
                        lv1 = c.lv1,
                        lv2 = c.lv2,
                        lv3 = c.lv3,
                        lv4 = c.lv4,
                        status = c.status
                    });
                });
            }

            // (status != 'D' & ( (lv0 = '' & lv1 = '' & lv2 = '' & lv3 = '') | ( (lv0 = 'xxx') & (lv1 = 'xxx') & (lv2 = 'xxx') & (lv3 = 'xxx') ) ) )

            // (lv0 = '' & lv1 = '' & lv2 = '' & lv3 = '')
            var publicFilter = Builders<T>.Filter.Ne("status", "D");

            // permission != "all" check for web-shared
            if (param.permission != "all")
            {
                if (param.organization.Count == 0)
                {
                    return publicFilter &= Builders<T>.Filter.Eq("isPublic", true);
                }
                else
                {
                    publicFilter &= Builders<T>.Filter.Eq("isPublic", true);
                    //publicFilter = (Builders<T>.Filter.Eq("lv0", "x") & Builders<T>.Filter.Eq("lv1", "x") & Builders<T>.Filter.Eq("lv2", "x") & Builders<T>.Filter.Eq("lv3", "x") & Builders<T>.Filter.Eq("lv4", "x"));

                    param.organization.ForEach(c =>
                    {
                        if (c.status == "A")
                        {
                            // (lv0 = 'xxx' & lv1 = 'xxx' & lv2 = 'xxx' & lv3 = 'xxx')
                            // Use 'Regex' because where lv like in content

                            var organizationFilter = Builders<T>.Filter.Ne("status", "D");

                            if (!string.IsNullOrEmpty(c.lv4))
                            {
                                var organization = c.lv4.Split(",");
                                for (int i = 0; i < organization.Length; i++)
                                {
                                    if (i == 0)
                                        organizationFilter = Builders<T>.Filter.Regex("lv4", organization[i]);
                                    else
                                        organizationFilter |= Builders<T>.Filter.Regex("lv4", organization[i]);
                                }

                                publicFilter |= (organizationFilter);
                            }
                            else if (!string.IsNullOrEmpty(c.lv3))
                            {
                                var organization = c.lv3.Split(",");
                                for (int i = 0; i < organization.Length; i++)
                                {
                                    if (i == 0)
                                        organizationFilter = Builders<T>.Filter.Regex("lv3", organization[i]);
                                    else
                                        organizationFilter |= Builders<T>.Filter.Regex("lv3", organization[i]);
                                }

                                publicFilter |= (organizationFilter);
                            }
                            else if (!string.IsNullOrEmpty(c.lv2))
                            {
                                var organization = c.lv2.Split(",");
                                for (int i = 0; i < organization.Length; i++)
                                {
                                    if (i == 0)
                                        organizationFilter = Builders<T>.Filter.Regex("lv2", organization[i]);
                                    else
                                        organizationFilter |= Builders<T>.Filter.Regex("lv2", organization[i]);
                                }

                                publicFilter |= (organizationFilter);
                            }
                            else if (!string.IsNullOrEmpty(c.lv1))
                            {
                                var organization = c.lv1.Split(",");
                                for (int i = 0; i < organization.Length; i++)
                                {
                                    if (i == 0)
                                        organizationFilter = Builders<T>.Filter.Regex("lv1", organization[i]);
                                    else
                                        organizationFilter |= Builders<T>.Filter.Regex("lv1", organization[i]);
                                }

                                publicFilter |= (organizationFilter);
                            }
                            else if (!string.IsNullOrEmpty(c.lv0))
                            {
                                var organization = c.lv0.Split(",");
                                for (int i = 0; i < organization.Length; i++)
                                {
                                    if (i == 0)
                                        organizationFilter = Builders<T>.Filter.Regex("lv0", organization[i]);
                                    else
                                        organizationFilter |= Builders<T>.Filter.Regex("lv0", organization[i]);
                                }

                                publicFilter |= (organizationFilter);
                            }
                        }
                    });
                }
            }

            // (status != 'D' & ( (lv0 = '' & lv1 = '' & lv2 = '' & lv3 = '') | ( (lv0 = 'xxx') & (lv1 = 'xxx') & (lv2 = 'xxx') & (lv3 = 'xxx') ) ) )
            //return ( publicFilter | ( (lv0Filter) & (lv1Filter) & (lv2Filter) & (lv3Filter) & (lv4Filter) & (lv5Filter) ) );
            return (publicFilter);
        }
