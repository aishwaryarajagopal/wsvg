"""
usage: python createLinksMap.py WhaleShark/ Humans/ ....(directories containing connection csvs)

output: assuming linksMap.txt is in the same directory, *appends* links to it (then just go manually into the file and add/remove the {} where ever needed)
"""

import os,sys,csv

allDirs = sys.argv[1:]
writer = open("linksMap.txt","a")
for curDir in allDirs:
	allFiles = os.listdir(curDir)
	for curFile in allFiles:
		reader=csv.reader(open(curDir+"/"+curFile, 'rU'), delimiter=',')
		for row in reader:
			try:
				writer.write('"'+row[0].lower()+'"'+':'+'"'+row[1].lower()+'"'+','+'\n')
			except Exception, e:
				continue

writer.close()