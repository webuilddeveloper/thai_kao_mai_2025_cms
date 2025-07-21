public static FilterDefinition<T> filterOrganization<T>(this Criteria param)
        {
            // (status != 'D' & ( (lv0 = '' & lv1 = '' & lv2 = '' & lv3 = '') | ( (lv0 = 'xxx') & (lv1 = 'xxx') & (lv2 = 'xxx') & (lv3 = 'xxx') ) ) )

            // (lv0 = '' & lv1 = '' & lv2 = '' & lv3 = '')
            var publicFilter = (Builders<T>.Filter.Eq("lv0", "") & Builders<T>.Filter.Eq("lv1", "") & Builders<T>.Filter.Eq("lv2", "") & Builders<T>.Filter.Eq("lv3", "") & Builders<T>.Filter.Eq("lv4", "") & Builders<T>.Filter.Eq("lv5", ""));

            if (param.organization.Count == 0)
            {
                publicFilter = Builders<T>.Filter.Eq("status", "A");
                return publicFilter;
            }
            else
            {
                param.organization.ForEach(c =>
                {
                    if (c.status == "A")
                    {
                        if (!string.IsNullOrEmpty(c.lv5))
                        {
                            var organization = c.lv5.Split(",");
                            for (int i = 0; i < organization.Count(); i++)
                            {
                                publicFilter |= Builders<T>.Filter.Regex("lv5", organization[i]);
                            }
                        }
                        else if (!string.IsNullOrEmpty(c.lv4))
                        {
                            var organization = c.lv4.Split(",");
                            for (int i = 0; i < organization.Count(); i++)
                            {
                                //if (i == 0)
                                //    organizationFilter |= Builders<T>.Filter.Regex("lv4", organization[i]);
                                //else
                                publicFilter |= Builders<T>.Filter.Regex("lv4", organization[i]);
                            }

                            //publicFilter |= (organizationFilter);
                        }
                        else if (!string.IsNullOrEmpty(c.lv3))
                        {
                            var organization = c.lv3.Split(",");
                            for (int i = 0; i < organization.Count(); i++)
                            {
                                //if (i == 0)
                                //    organizationFilter |= Builders<T>.Filter.Regex("lv3", organization[i]);
                                //else
                                publicFilter |= Builders<T>.Filter.Regex("lv3", organization[i]);
                            }

                            //publicFilter |= (organizationFilter);
                        }
                        else if (!string.IsNullOrEmpty(c.lv2))
                        {
                            var organization = c.lv2.Split(",");
                            for (int i = 0; i < organization.Count(); i++)
                            {
                                //if (i == 0)
                                //    organizationFilter |= Builders<T>.Filter.Regex("lv2", organization[i]);
                                //else
                                publicFilter |= Builders<T>.Filter.Regex("lv2", organization[i]);
                            }

                            //publicFilter |= (organizationFilter);
                        }
                        else if (!string.IsNullOrEmpty(c.lv1))
                        {
                            var organization = c.lv1.Split(",");
                            for (int i = 0; i < organization.Count(); i++)
                            {
                                //if (i == 0)
                                //    organizationFilter |= Builders<T>.Filter.Regex("lv1", organization[i]);
                                //else
                                publicFilter |= Builders<T>.Filter.Regex("lv1", organization[i]);
                            }

                            //publicFilter |= (organizationFilter);
                        }
                        else if (!string.IsNullOrEmpty(c.lv0))
                        {
                            var organization = c.lv0.Split(",");
                            for (int i = 0; i < organization.Count(); i++)
                            {
                                //if (i == 0)
                                //    organizationFilter |= Builders<T>.Filter.Regex("lv0", organization[i]);
                                //else
                                publicFilter |= Builders<T>.Filter.Regex("lv0", organization[i]);
                            }

                            //publicFilter |= (organizationFilter);
                        }
                    }
                });
            }

            // (status != 'D' & ( (lv0 = '' & lv1 = '' & lv2 = '' & lv3 = '') | ( (lv0 = 'xxx') & (lv1 = 'xxx') & (lv2 = 'xxx') & (lv3 = 'xxx') ) ) )
            //return ( publicFilter | ( (lv0Filter) & (lv1Filter) & (lv2Filter) & (lv3Filter) & (lv4Filter) & (lv5Filter) ) );
            return (publicFilter);
        }
